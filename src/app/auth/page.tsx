'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import React from 'react';
import axios, { AxiosResponse } from 'axios';

interface Resp {
  access_token: string;
  bot_id: string;
  duplicated_template_id?: string;
  owner: any;
  workspace_icon?: string;
  workspace_id: string;
  workspace_name?: string;
}

const redirectUri = 'https://kkirook.vercel.app/auth';

export default function Auth() {
  const params = useSearchParams();
  const code = params.get('code');

  const handlePost = async () => {
    if (!code) {
      alert('no code');
      return;
    }

    const res = await axios.post<any, AxiosResponse<Resp>>('/api/auth', {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
    });

    const { access_token, duplicated_template_id } = res.data;
    if (access_token && duplicated_template_id) {
      alert('성공했습니다');
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('page_id', duplicated_template_id);
    }
    // TODO:
    /**
     * access_token 등으로 todolist 추가하는 로직
     */
  };

  useEffect(() => {
    handlePost();
  }, [code]);

  return (
    <section className='h-full w-full p-6'>
      <div>auth succeed</div>
    </section>
  );
}
