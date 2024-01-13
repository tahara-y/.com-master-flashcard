import HamburgerMenu from '../../ Atoms/HamburgerMenu/HamburgerMenu';
import { Button } from '@chakra-ui/react';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { HiOutlineLogout } from 'react-icons/hi';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const HamburgerMenuItems = () => {
  const navigate = useNavigate();
  const handleClickSignOutButton = () => {
    navigate('../');
  };

  return (
    <HamburgerMenu>
      <SContent>
        <SDivider />
        < div >
          <SButton variant='ghost'>
            <AiOutlineSetting size="24px" />
            <SButtonText>Setting</SButtonText>
          </SButton>
        </ div>
        <SDivider />
        <div>
          <SButton variant='ghost'>
            <BiUser size="24px" />
            <SButtonText>Profile</SButtonText>
          </SButton>
        </div>
        <SDivider />
        <div>
          <SButton onClick={handleClickSignOutButton} variant='ghost'>
            <HiOutlineLogout size="24px" />
            <SButtonText>Sign out</SButtonText>
          </SButton>
        </div>
        <SDivider />
      </SContent>
    </HamburgerMenu >
  );
};

const SContent = styled.div`
  margin-top: 1rem;
  width: 90%;
`;

const SDivider = styled.hr`
  order: none;
  border: 1px solid #000000;
  opacity: 0.12;
`;

const SButton = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 0;
  padding-bottom: 1rem;
  padding-top: 1rem;
  height: auto;
`;

const SButtonText = styled.div`
  margin-left: 0.75rem;
  opacity: 87%;
  font-weight: bold;
`;

export default HamburgerMenuItems;
