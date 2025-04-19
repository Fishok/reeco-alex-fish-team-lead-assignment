import UsersTable from '@/components/users/UsersTable.tsx';
import Modal from '@/system-toolkit/Modal.tsx';
import React, { useState } from 'react';
import { useDeleteUserMutation } from '@/features/api/userApi.ts';
import { User } from '@/types/userTypes.ts';
import UserModal from '@/components/users/UserModal.tsx';
import Button from '@/system-toolkit/Button.tsx';
import withPermission from '@/hoc/withPermission.tsx';


const CreateButtonWithPermissions = withPermission('users:add')(Button)

const Users = () => {
  const [deleteUser] = useDeleteUserMutation();
  const [userToBeDeleted, setUserToBeDeleted] = useState<null | number>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userModal, setUserModal] = useState(false);

  const openUserModal = () => setUserModal(true);
  const closeModal = () => {
    setUserModal(false);
    setSelectedUser(null);
  };

  return (
    <div>
      <UsersTable userModalController={openUserModal} setUserToBeDeleted={setUserToBeDeleted}
                  setSelectedUser={setSelectedUser} />
      <div className="w-full flex justify-end mt-2">
        <CreateButtonWithPermissions onClick={() => setUserModal(true)}>New User</CreateButtonWithPermissions>
      </div>
      {!!userToBeDeleted &&
        <Modal confirmText={'Delete'} close={() => setUserToBeDeleted(null)} onConfirm={() => deleteUser({ id: userToBeDeleted! }).then(() => {
          setUserToBeDeleted(null);
        })} title={'Delete user'}>
          <div className="p-2">
            Are you sure you want to delete this user?
          </div>
        </Modal>}
      {userModal && <UserModal close={closeModal} user={selectedUser} />}
    </div>
  );
};

export default Users;