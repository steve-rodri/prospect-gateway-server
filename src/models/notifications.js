import dbc from '../db/dbc';

export const createNotification = async (notificationName, senderName, recipientName) => {
  const getTypeIdQuery = dbc('notification_types').where('name', '=', notificationName).select('id');
  const getSenderIdQuery = dbc('users').where('username', '=', senderName).select('id');
  const getRecipientIdQuery = dbc('users').where('username', '=', recipientName).select('id');

  const typeId = (await getTypeIdQuery)[0].id;
  const senderId = (await getSenderIdQuery)[0].id;
  const recipientId = (await getRecipientIdQuery)[0].id;
  const dateSent = new Date().toISOString();
  const key = `${notificationName[0]}${senderId}${recipientId}`;

  // ASK: better way to handle duplicates?
  const locateDuplicateQuery = dbc('notifications').where('key', '=', key).where('status', '=', 'pending');

  const duplicate = (await locateDuplicateQuery)[0];

  // allow duplicate competition notifications, but not duplicate friend request notifications
  if (notificationName !== 'friendship' || !duplicate) {
    await dbc('notifications').insert({
      type_id: typeId,
      sender_id: senderId,
      recipient_id: recipientId,
      date_sent: dateSent,
      status: 'pending',
      key: key,
    });
  }
};

// use a trx
export const updateNotification = async (notificationId, newStatus) => {

}