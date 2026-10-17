export const accountOperations={
 profile:['profile.save'],contact:['contact.request','contact.confirm'],password:['password.change'],sessions:['sessions.revoke'],connections:['provider.connect','provider.disconnect'],twofactor:['twofactor.enable','twofactor.disable'],recovery:['recovery.reveal','recovery.rotate'],passkeys:['passkey.create','passkey.rename','passkey.revoke'],visibility:['visibility.save'],addresses:['address.add','address.update','address.remove','address.primary','address.restore'],
 communications:['communications.save'],security:['security.acknowledge'],recipient:['recipient.save'],methods:['methods.add','methods.remove','methods.primary'],documents:['documents.retrieve'],subscription:['subscription.period','subscription.cancel','subscription.restore'],orders:['orders.repeat'],returns:['returns.submit','returns.withdraw'],tickets:['tickets.create','tickets.reply','tickets.status'],exports:['exports.request','exports.refresh','exports.cancel','exports.retrieve'],
 region:['region.save'],balance:[],rewards:['rewards.redeem'],referrals:['referrals.refresh'],licenses:['licenses.activate','licenses.revoke'],appointments:['appointments.move','appointments.cancel','appointments.restore'],reviews:['reviews.save','reviews.withdraw','reviews.restore'],members:['members.role','members.remove'],ownership:['ownership.request','ownership.cancel','ownership.refresh'],lifecycle:['lifecycle.pause','lifecycle.delete','lifecycle.restore','lifecycle.cancel'],
};
export const accountResults={
 contact:'contact.request may return {challengeId}; confirmation receives that id, the requested contact kind/value and the six-digit code.',
 recovery:'recovery.reveal and recovery.rotate must return {codes: string[]}; codes are rendered as literal text and omitted from public state.',
 passkeys:'passkey.create should return {id: string} with a unique application-owned credential id. No WebAuthn call is performed by the component.',
 methods:'methods.add must return {method: {id: string, label: string, last4: string}} with a unique id and exactly four last4 digits. Never pass full card details.',
 returns:'returns.submit should return {id: string} for the application-owned return request.',
 tickets:'tickets.create should return {id: string} for the new ticket. Reply/status actions receive a captured ticket id.',
 exports:'exports.request should return {id: string}; exports.refresh must return {phase: "pending" | "ready"}. retrieve delegates file retrieval to the application; the component does not download files.',
 referrals:'referrals.refresh must return {status: "pending" | "registered" | "qualified"}. Only qualified referrals contribute points.',
 licenses:'licenses.activate must return {device: {id: string, name: string}} with a unique id. Revoke receives captured productId and deviceId.',
 ownership:'ownership.refresh must return {accepted: boolean}. The owner changes only after accepted is true. Accepting as another person is available only in mountPreview.',
 lifecycle:'Deletion requires the literal English confirmation DELETE and sends {confirmation: "DELETE"}. Pause, resume and cancel are separate actions. No account is deleted by this component.',
 region:'The public initial locale is en-GB. The language choice can intentionally render a date in Russian when the user selects Russian; fixed interface labels remain English.',
 balance:'Read-only sample ledger. Filtering changes displayed transactions, never the computed balance.',
};
