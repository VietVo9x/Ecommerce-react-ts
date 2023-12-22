import { Button } from '@mui/material';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/configureStore';
import { Res_UserInfoLogin } from '../../types/response.type';

export default function UpdateAvatar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [image, setImage] = useState<string>('');
  const [file, setFile] = useState<File>();
  useEffect(() => {
    if (user) setImage((user as Res_UserInfoLogin).avatar);
  }, [user]);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      setImage(URL.createObjectURL(event.currentTarget.files[0]));
      setFile(event.currentTarget.files[0]);
    }
  };
  const handleSubmit = () => {};
  console.log(Boolean(file));
  return (
    <div>
      <label htmlFor="image" style={{ cursor: 'pointer' }}>
        <img alt="preview image" src={image} width={300} height={300} />
      </label>{' '}
      <input type="file" onChange={onImageChange} className="filetype" id="image" hidden />
      <div>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
}
