import { FirestoreDataConverter } from 'firebase/firestore/lite';

import { User } from '../Types';

// @ts-expect-error: We don't use a converter when creating users so 'toFirestore' method is obsolete
const userConverter: FirestoreDataConverter<User, DBUser> = {
  fromFirestore: snapshot => {
    const user = snapshot.data();
    return {
      uid: snapshot.id,
      username: user.username,
      email: user.email,
      verified: user.verified,
      created_at: user.created_at.toDate()
    };
  }
};

export default userConverter;
