import { uploadPhoto, createUser } from './utils';

export default async function asyncUploadUser() {
  let resp = {};

  try {
    const photo = await uploadPhoto();
    const user = await createUser();
    resp = { photo, user };
  } catch (er) {
    resp = { photo: null, user: null };
  }
  return resp;
}
