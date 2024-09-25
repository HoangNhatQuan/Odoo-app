import { useNavigate } from 'react-router-dom'
import { useWindowSize } from 'react-use'

import Container from './container'

import { HeroIconSolid } from './icons'
import { removeAccessToken } from '@/utils'
import { useProfile } from '@/providers/auth.provider'

const Logo = ({
  onNavigate,
  isMobile,
}: {
  onNavigate: () => void
  isMobile: boolean
}) => (
  <div
    onClick={onNavigate}
    className="flex flex-row gap-2 items-center cursor-pointer flex-1"
  >
    <HeroIconSolid.BuildingStorefrontIcon className="text-default w-16 h-16" />
    {!isMobile && (
      <h4 className="text-default font-bold">
        Odoo <br /> Store
      </h4>
    )}
  </div>
)

export default function Header() {
  const { width } = useWindowSize()
  const isMobile = width < 992
  const navigate = useNavigate()
  const { user, setUser } = useProfile()

  const handleLogout = () => {
    setUser(null)
    navigate('/login')
    removeAccessToken()
  }

  return (
    <div className="sticky top-0 z-50 bg-[#EFD8D0] p-4">
      <Container bodyClassName="flex-row !px-0">
        <Logo isMobile={isMobile} onNavigate={() => navigate('/')} />
        <div className="flex flex-row gap-2 items-center">
          <div className="flex flex-row items-center gap-4">
            <h5 className="md:text-base text-sm">Welcome, {user?.name}</h5>
            {!isMobile && (
              <button className="btn btn-warning" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>

          {isMobile && (
            <div className="drawer drawer-end w-auto">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content flex justify-end items-center">
                <label htmlFor="my-drawer-4" className="flex justify-end">
                  <HeroIconSolid.BuildingStorefrontIcon className="text-default w-8 h-8" />
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                />
                <div className="bg-[#1B4348] w-[70%] h-full p-6 flex flex-col gap-6">
                  <button
                    onClick={() => navigate('/sharing')}
                    className="btn btn-primary bg-[#816557]"
                  >
                    Share a movie
                  </button>
                  <button className="btn btn-warning" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
