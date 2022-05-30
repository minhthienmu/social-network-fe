export const SET_NEW_CHAT_ROOM = "SET_NEW_CHAT_ROOM";

export const setNewChatRoom = (chatroom: any) => ({
    type: SET_NEW_CHAT_ROOM,
    chatroom,
});
