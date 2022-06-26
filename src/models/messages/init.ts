import { $messages, setMessages, unSetMessages } from '.';

$messages.on(setMessages, (_, data) => data).reset(unSetMessages);
