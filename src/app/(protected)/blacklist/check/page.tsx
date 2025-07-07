"use client"

import React from 'react';
import BlacklistProfileForm from '../container/form/form';
import { useBlacklistCheck } from '../hook/useForm';
import { TitleLabel } from '@/components/containers/headerLabel';

const Page = () => {
  const { form, onSubmit, statusMessage } = useBlacklistCheck();
  return (
    <>
      <TitleLabel title='ກວດສອບບຸກຄົນຕິດບັນຊີດໍາ' subtitle=''/>
      <BlacklistProfileForm form={form} onSubmit={onSubmit} statusMessage={statusMessage}/>
    </>
  );
}

export default Page;
