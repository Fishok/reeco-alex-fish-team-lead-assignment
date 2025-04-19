import { Link, useLocation } from 'react-router-dom';
import logo from '@/shared/images/reeco_logo.jpg';
import { settingRoute, systemRoutes } from '@/routes';


const Navbar = () => {
  const location = useLocation();
  /**
   * NOTE:
   * In a real application, user data (name, email, etc.) would be taken from the store
   * using a selector (e.g., useAppSelector), not hardcoded.
   */
  const user = {
    name: 'Alex Fish',
    email: 'sashafish93@gmail.com',
  };

  return (
    <div className="p-4 pt-2 h-full flex flex-col justify-between">
      <div className="flex flex-col justify-between">
        <img
          className="object-contain mb-8"
          src={logo}
          alt="Logo"
        />
        {systemRoutes.map((item) => {
          const isActive = location.pathname.includes(item.root);
          return (
            <div key={item.root} className="flex justify-center mb-8 ">
              <Link to={item.root}>
                <item.icon
                  className={`${isActive ? 'fill-orange-500' : 'fill-naturals-400'}`}
                />
              </Link>
            </div>
          );
        })}
      </div>
      <div>
        <div className="flex justify-center mb-3 ">
          <Link to={settingRoute.root}>
            <settingRoute.icon
              className={`${location.pathname.includes(settingRoute.root) ? 'fill-orange-500' : 'fill-naturals-400'}`}
            />
          </Link>
        </div>
        <div
          className="w-8 h-8 bg-primary text-white text-xs font-semibold leading-4 flex justify-center items-center uppercase">
          {user?.name.substring(0, 2)}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
