import { Button, FormHelperText } from '@mui/material';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/configureStore';
import { Res_UserInfoLogin } from '../../types/response.type';
import { displayError } from '../../utils/display-error';
import AccountService from './account.service';
import { displaySuccessMessage } from '../../utils/display-success';

interface Props {
  flag: boolean;
  setFlag: Function;
}

export default function UpdateAvatar(props: Props) {
  const user = useSelector((state: RootState) => state.auth.user);
  const accountService = new AccountService();
  const [image, setImage] = useState<string>('');
  const [file, setFile] = useState<File | undefined>();
  const [error, setError] = useState({
    isError: false,
    msgFile: '',
  });
  const [showSaveButton, setShowSaveButton] = useState(false);
  useEffect(() => {
    if (user) setImage((user as Res_UserInfoLogin).avatar);
  }, [user]);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      const selectedFile = event.currentTarget.files[0];
      setImage(URL.createObjectURL(selectedFile));
      setFile(event.currentTarget.files[0]);
      setShowSaveButton(true);
    }
  };

  const handleEditClick = () => {
    // Khi nút "edit" được nhấn, kích hoạt việc chọn file từ input
    const fileInput = document.getElementById('imageInput');
    if (fileInput) {
      fileInput.click();
    }
  };
  const handleSubmit = async () => {
    try {
      if (file) {
        const resultError = accountService.validateFile(file);
        setError(resultError);
        if (resultError.isError) return;
        if (user) await accountService.UpdateAvatar((user as Res_UserInfoLogin).id, file);
        displaySuccessMessage('You update avatar successfully');
        props.setFlag(!props.flag);
      } else {
        setError({
          isError: true,
          msgFile: 'Please select a file.',
        });
      }
    } catch (error) {
      displayError(error);
    }
  };

  return (
    <div>
      <img alt="preview image" src={image} width={300} height={300} />
      <input
        type="file"
        onChange={onImageChange}
        className="filetype"
        id="imageInput"
        style={{ display: 'none' }} // Ẩn input bằng CSS
      />
      <FormHelperText style={{ color: 'red' }}>{error.msgFile}</FormHelperText>
      <div>
        <label htmlFor="imageInput">
          <Button variant="contained" onClick={handleEditClick}>
            edit
          </Button>
        </label>
        {showSaveButton && (
          <Button
            sx={{ marginLeft: '10px' }}
            variant="contained"
            color="success"
            onClick={handleSubmit}
          >
            Save
          </Button>
        )}
      </div>
    </div>
  );
}
