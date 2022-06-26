import { ConnectionStatus } from '@/features/chat/types';
import { MessagesType } from '@/models/messages/types';

export type MessagesReceived = (messages: MessagesType) => void;
export type MessagesReceivedSubscribers = Array<MessagesReceived>;

export type StatusChanged = (status: ConnectionStatus) => void;
export type StatusChangedSubscribers = Array<StatusChanged>;

export type SubscriberCallBack = MessagesReceived | StatusChanged;
