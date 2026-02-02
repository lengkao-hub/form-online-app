"use client";

import { Form } from "@/components/containers/form";
import React from "react";
import { handleEnterFocusNext } from "src/app/(protected)/profile/container/form/field-focus";

const formTitle = "ສ້າງຜູ້ໃຊ້ງານລະບົບ";
const formSubtitle = "ກະລຸນາປ້ອນຂໍ້ມູນຜູ້ໃຊ້ງານລະບົບໃຫ້ຖ້ວນ";

const UserForm: React.FC<any> = ({ form, onSubmit }) => {
  return (
    <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Form.Field name="username" control={form.control} label="ຊື່ຜູ້ໃຊ້ງານລະບົບ" description="ຊື່ບັນຊີຜູ້ໃຊ້">
          <Form.Input.Input placeholder="Username" onKeyDown={handleEnterFocusNext} />
        </Form.Field>
        <Form.Field name="phone" control={form.control} label="ເບີໂທ" description="ເບີໂທນີ້ແມ່ນໃຊ້ເຂົ້າລະບົບ">
          <Form.Input.Input placeholder="5xxxxxxx or 7xxxxxxx or 9xxxxxxx" onKeyDown={handleEnterFocusNext} />
        </Form.Field>
        <Form.Field name="firstName" control={form.control} label="ຊື່ແທ້" description="ຊື່ແທ້">
          <Form.Input.Input placeholder="First name " onKeyDown={handleEnterFocusNext} />
        </Form.Field>
        <Form.Field name="lastName" control={form.control} label="ນາມສະກຸນ" description="ນາມສະກຸນ">
          <Form.Input.Input placeholder="Last name" onKeyDown={handleEnterFocusNext} />
        </Form.Field>

        <Form.Field name="email" control={form.control} label="ອີເມລ" required={false}>
          <Form.Input.Input placeholder="example@gmail.com" className="w-full" onKeyDown={handleEnterFocusNext} />
        </Form.Field>
        <div>
          <Form.Field name="password" control={form.control} label="ລະຫັດຜ່ານ">
            <Form.Input.Password onKeyDown={handleEnterFocusNext} />
          </Form.Field>
          <Form.Field name="isActive" control={form.control} label="ສະຖານະເປີດໃຊ້ງານ" required={false}>
            <Form.Input.Switch />
          </Form.Field>
        </div>

      </div>
      {form.formState.errors.root && (
        <p className="text-red-600 text-sm">{form.formState.errors.root.message}</p>
      )}
    </Form>
  );
};

export default UserForm;

