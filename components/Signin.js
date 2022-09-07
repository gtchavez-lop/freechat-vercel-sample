import { Button } from '@material-tailwind/react';
import { Input } from '@material-tailwind/react';
import { useState } from 'react';

const SignIn = (e) => {
  const [username, setUsername] = useState('');

  const setAccount = (val) => {
    window.sessionStorage.setItem('user', val);
  };
  const getAccount = () => {
    return window.sessionStorage.getItem('user');
  };

  return (
    <>
      <main className="fixed z-50 flex justify-center items-center w-full h-full inset-0">
        <section className="flex flex-col gap-2 w-64">
          <Input
            onChange={(e) => {
              setUsername(e.target.value);
              console.log(getAccount());
            }}
            label="Your nickname here"
          />
          <Button
            onClick={(e) => {
              setAccount(username);
              window.location.reload();
            }}
          >
            Start Chatting
          </Button>
        </section>
      </main>
    </>
  );
};

export default SignIn;
