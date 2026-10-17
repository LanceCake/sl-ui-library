import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

export const families = [
  ['compositions',1,'accordion select multi files wizard nav gallery reorder comments cookies search tabs filters featured-card contact newsletter cta features announcement footer'],
  ['next-twenty',21,'login register contact booking pricing comparison testimonials team metrics process product cart delivery promo saved reader table notifications export not-found'],
  ['everyday-buttons',41,'top more defaults redo invert expand-all invite signout call email support directions calendar'],
  ['daily-controls',56,'currency payment signature poll partners hours splitter tracking'],
  ['account-core',64,'profile contact password sessions connections twofactor recovery passkeys visibility addresses'],
  ['account-services',74,'communications security recipient methods documents subscription orders returns tickets exports'],
  ['account-extensions',84,'region balance rewards referrals licenses appointments reviews members ownership lifecycle'],
];
export const existingCategories=['buttons','inputs','selection','checkboxes','sliders','menus','navigation','overlays','feedback','data-display'];
// Explicit purpose assignments for unpublished additions. Never infer a category
// from a key shared by another family, or silently default new keys to display.
export const categoryMap={
  compositions:{accordion:'menus',select:'selection',multi:'selection',files:'inputs',wizard:'inputs',nav:'navigation',gallery:'data-display',reorder:'selection',comments:'data-display',cookies:'selection',search:'inputs',tabs:'navigation',filters:'selection','featured-card':'data-display',contact:'inputs',newsletter:'inputs',cta:'buttons',features:'checkboxes',announcement:'feedback',footer:'navigation'},
  'next-twenty':{login:'inputs',register:'inputs',contact:'inputs',booking:'inputs',pricing:'selection',comparison:'data-display',testimonials:'data-display',team:'data-display',metrics:'data-display',process:'data-display',product:'selection',cart:'selection',delivery:'selection',promo:'inputs',saved:'data-display',reader:'navigation',table:'data-display',notifications:'feedback',export:'buttons','not-found':'feedback'},
  'everyday-buttons':{top:'buttons',more:'buttons',defaults:'buttons',redo:'buttons',invert:'buttons','expand-all':'buttons',invite:'buttons',signout:'buttons',call:'buttons',email:'buttons',support:'buttons',directions:'buttons',calendar:'buttons'},
  'daily-controls':{currency:'selection',payment:'selection',signature:'inputs',poll:'selection',partners:'data-display',hours:'data-display',splitter:'sliders',tracking:'data-display'},
  // Account editors belong to inputs; preferences/choices to selection; lists,
  // credentials and ledgers to display; the export request is an action workflow.
  'account-core':{profile:'inputs',contact:'inputs',password:'inputs',sessions:'data-display',connections:'selection',twofactor:'selection',recovery:'data-display',passkeys:'data-display',visibility:'selection',addresses:'inputs'},
  'account-services':{communications:'selection',security:'data-display',recipient:'inputs',methods:'selection',documents:'data-display',subscription:'selection',orders:'data-display',returns:'inputs',tickets:'inputs',exports:'buttons'},
  'account-extensions':{region:'selection',balance:'data-display',rewards:'selection',referrals:'data-display',licenses:'data-display',appointments:'inputs',reviews:'inputs',members:'selection',ownership:'inputs',lifecycle:'selection'},
};
export const approved91 = families.flatMap(([batch,start,keys]) => keys.split(' ').map((key,i)=>{
  const category=categoryMap[batch]?.[key];
  if(!existingCategories.includes(category))throw new Error(`Missing approved category for ${batch}:${key}`);
  const variant=`${category}-${batch}-${key}-v11`;
  return {localNumber:start+i,batch,key,category,id:`matte-${variant}`,variants:[variant]};
}));

/** Verify frozen reviewed sources, without importing or executing review apps. */
export async function verifySources(sourceRoot) {
  const root=sourceRoot instanceof URL?fileURLToPath(sourceRoot):sourceRoot;
  const manifest=JSON.parse(await readFile(new URL('../approved-91.json',import.meta.url),'utf8'));
  for(const [relative,expected] of Object.entries(manifest.sources)) {
    if(!/^(experiments\/[a-z-]+-ru\/[^/]+|public\/draft-ten-ru.js)$/.test(relative)||relative.includes('final'))throw new Error(`Forbidden source ${relative}`);
    const actual=createHash('sha256').update(await readFile(resolve(root,relative))).digest('hex');
    if(actual!==expected)throw new Error(`Reviewed source changed: ${relative}`);
  }
  return true;
}
