import PropTypes from 'prop-types'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Popover,
  Switch,
  Typography,
} from '@mui/material'
import { usePopover } from '../../hooks/use-popover'
import { ChevronDown as ChevronDownIcon } from '../../icons/chevron-down'
import { Logout as LogoutIcon } from '../../icons/logout'
import { OfficeBuilding as OfficeBuildingIcon } from '../../icons/office-building'
import { User as UserIcon } from '../../icons/user'
import { InputField } from '../input-field'
import { useAuth } from '../../providers/AuthProvider'
import { ROLES } from '../../constants/roles'

const languageOptions = {
  en: {
    label: 'English',
  },
  de: {
    label: 'German',
  },
  es: {
    label: 'Spanish',
  },
}

export const AccountPopover = (props) => {
  const {
    currentOrganization,
    darkMode,
    onLanguageChange,
    onOrganizationChange,
    onSwitchDirection,
    onSwitchTheme,
    organizations,
    rtlDirection,
    ...other
  } = props
  const { i18n, t } = useTranslation()
  const router = useRouter()
  const { logout, user } = useAuth()
  const [anchorRef, open, handleOpen, handleClose] = usePopover()

  const handleOrganizationChange = (event) => {
    onOrganizationChange?.(event.target.value)
  }

  const handleLanguageChange = (event) => {
    onLanguageChange(event.target.value)
  }
  const handleLogout = () => {
    logout()
    router.push('/authentication/login')
  }

  return (
    <>
      <Box
        onClick={handleOpen}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          cursor: 'pointer',
          display: 'flex',
          ml: 2,
        }}
        {...other}
      >
        <Avatar
          src={user?.avatar}
          variant="rounded"
          sx={{
            height: 30,
            width: 30,
            borderRadius: 5,
          }}
        />
        <Box
          sx={{
            alignItems: 'center',
            display: {
              md: 'flex',
              xs: 'none',
            },
            flex: 1,
            ml: 0,
            minWidth: 10,
          }}
        >
          {/* <div>
            <Typography sx={{ color: 'text.primary' }} variant="caption">
              {t(`roles.${user?.roles}`) || ''}
            </Typography>
            <Typography
              sx={{ color: 'text.primary', textTransform: 'capitalize' }}
              variant="subtitle2"
            >
              {user?.name}
            </Typography>
          </div> */}
          <ChevronDownIcon
            fontSize="14px"
            sx={{
              color: 'text.primary',
              ml: 0.4,
              opacity: 0.6,
            }}
          />
        </Box>
      </Box>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: {
            width: 260,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {/* <InputField
          fullWidth
          onChange={handleOrganizationChange}
          select
          SelectProps={{ native: true }}
          value={currentOrganization.id}
          sx={{
            display: {
              md: "none",
            },
            pt: 2,
            px: 2,
          }}
        >
          {organizations.map((organization) => (
            <option key={organization.id} value={organization.id}>
              {organization.name}
            </option>
          ))}
        </InputField> */}
        <List>
          <ListItem divider>
            <ListItemAvatar>
              <Avatar variant="rounded" src={user?.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={user?.name}
              secondary={t(`roles.${user?.roles}`) || ''}
            />
          </ListItem>
          <li>
            {/* {<List disablePadding>
              <ListSubheader disableSticky>
                App Settings
              </ListSubheader>
              <ListItem
                sx={{
                  display: {
                    md: 'none',
                    xs: 'flex'
                  }
                }}
              >
                <InputField
                  fullWidth
                  onChange={handleLanguageChange}
                  select
                  SelectProps={{ native: true }}
                  value={i18n.language}
                >
                  {Object.keys(languageOptions).map((option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {languageOptions[option].label}
                    </option>
                  ))}
                </InputField>
              </ListItem>
              <ListItem
                sx={{
                  py: 0,
                  display: {
                    md: 'none',
                    xs: 'flex'
                  }
                }}
              >
                <Switch
                  checked={darkMode}
                  onChange={onSwitchTheme}
                />
                <Typography
                  color="textPrimary"
                  variant="body2"
                >
                  Dark Mode
                </Typography>
              </ListItem>
              <ListItem
                divider
                sx={{ pt: 0 }}
              >
                <Switch
                  checked={rtlDirection}
                  onChange={onSwitchDirection}
                />
                <Typography
                  color="textPrimary"
                  variant="body2"
                >
                  RTL
                </Typography>
              </ListItem>
            </List>} */}
          </li>
          <NextLink href="/dashboard/organization" passHref>
            <ListItem button component="a" divider onClick={handleClose}>
              <ListItemIcon>
                <OfficeBuildingIcon />
              </ListItemIcon>
              <ListItemText primary={t('acountHeader.Organization')} />
            </ListItem>
          </NextLink>
          <NextLink href="/dashboard/account" passHref>
            <ListItem button component="a" divider onClick={handleClose}>
              <ListItemIcon>
                <UserIcon />
              </ListItemIcon>
              <ListItemText primary={t('acountHeader.Account')} />
            </ListItem>
          </NextLink>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={t('acountHeader.Logout')} />
          </ListItem>
        </List>
      </Popover>
    </>
  )
}

AccountPopover.propTypes = {
  currentOrganization: PropTypes.object.isRequired,
  darkMode: PropTypes.bool.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  onOrganizationChange: PropTypes.func.isRequired,
  onSwitchDirection: PropTypes.func.isRequired,
  onSwitchTheme: PropTypes.func.isRequired,
  organizations: PropTypes.array.isRequired,
  rtlDirection: PropTypes.bool.isRequired,
}
