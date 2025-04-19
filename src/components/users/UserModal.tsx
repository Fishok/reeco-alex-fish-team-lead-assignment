import React, { FC, useState } from 'react';
import { CreateUserDto, UpdateUserDto, User } from '@/types/userTypes.ts';
import Input from '@/system-toolkit/input';
import Modal from '@/system-toolkit/Modal.tsx';
import { useCreateUserMutation, useDeleteUserMutation, useUpdateUserMutation } from '@/features/api/userApi.ts';


type Props = {
  user: User | null
  close: () => void
}

const initUserValue: Partial<User> = {
  name: '',
  email: '',
  active: true,
};

const UserModal: FC<Props> = ({ user, close }) => {
  const [updateUser] = useUpdateUserMutation();
  const [createUser] = useCreateUserMutation();
  const [userData, setUserData] = useState<Partial<User>>(user ?? initUserValue);

  const onConfirm = () => {
    if (user) {
      updateUser(userData as UpdateUserDto)
        .then(() => {
          close();
        });
    } else {
      createUser(userData as CreateUserDto)
        .then(() => {
          close();
        });
    }
  };

  return (
    <Modal disableConfirm={!userData.email || !userData.name} confirmText={user?.id ? 'Update' : 'Create'} onConfirm={onConfirm} close={close}
           title={user?.id ? 'Edit user' : 'Create user'}>
      <div className="p-2 w-full">
        <Input placeholder="Name" className="w-full mb-2" label={'Name'} value={userData.name!}
               onChange={(newValue) => setUserData({ ...userData, name: newValue })} />
        <Input placeholder="Email" className="w-full" label={'Email'} type="email" value={userData.email!}
               onChange={(newValue) => setUserData({ ...userData, email: newValue })} />
      </div>
    </Modal>
  );
};

export default UserModal;