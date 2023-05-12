import useAuth from "@/data/hooks/useAuth";
import { Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import React from "react";
import { HiOutlineLogout } from "react-icons/hi";

export function Perfil() {
  const { usuario, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex items-center">
      <span className="dark:text-white text-sm font-semibold mr-5">
        Olá {usuario?.nome}
      </span>
      {usuario?.imagem == "" ? (
        <div className="bg-gray-600 rounded-full mr-5 h-[35px] w-[35px] cursor-pointer" onClick={handleClick}>
          <h2 className="text-white text-center mt-1.5 font-bold">
            {usuario.nome?.substring(0, 1).toUpperCase()}
          </h2>
        </div>
      ) : (
        <Image
          alt="perfil"
          src={usuario?.imagem !== undefined ? usuario?.imagem : ""}
          className="rounded-full mr-5 cursor-pointer"
          width="35"
          height="35"
          onClick={handleClick}
        />
      )}
      <div>
        
      </div>
      <Menu
        disableScrollLock={true}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 2,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 35,
              height: 35,
              ml: -0.5,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <button className="flex" onClick={logout}>
            <div>Sair</div>
            <HiOutlineLogout className="dark:text-white mt-1 mx-2" />
          </button>
        </MenuItem>
      </Menu>
    </div>
  );
}
