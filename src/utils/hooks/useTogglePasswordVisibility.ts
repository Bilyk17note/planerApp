import {useState} from 'react';

const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye-off-outline');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye-off-outline') {
      setRightIcon('eye-outline');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-outline') {
      setRightIcon('eye-off-outline');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
  };
};

export default useTogglePasswordVisibility;
