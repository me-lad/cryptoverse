import type { SupportMessageType } from '~models/SupportMessage/types';
import { connectToDB } from '~vendors/mongoose';
import SupportMessageModel from '~models/SupportMessage';

const createMessage = async (data: SupportMessageType) => {
  try {
    await connectToDB();
    await SupportMessageModel.model.init();
    await SupportMessageModel.model.create(data);
    return true;
  } catch (err) {
    console.log('Error in creating support message ->', err);
  }
};

export const SupportService = {
  createMessage,
};
