import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import "../../css/styleDashbord.css"
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TryIcon from '@mui/icons-material/Try';
import HomeIcon from '@mui/icons-material/Home';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

const SidebarDashBord = () => {
    return (
        <aside>
            <nav>
                <ul>
                    <br/>
                    <li>
                        <Link to = '/homeDashBord'> <HomeIcon/> Home DashBord</Link>
                    </li>

                    <li>
                        <Link to = '/profileDashBord'> <PersonPinIcon/> Mon Profile</Link>
                    </li>

                    <li>
                        <Link to = '/servicePrestation'> <AssignmentTurnedInIcon/> Mes Prestations</Link>
                    </li>

                    <li>
                        <Link to = "/notif"> <CircleNotificationsIcon/> Mes Notifications</Link>
                    </li>

                    <li>
                        <Link to = '/clientlike'> <TryIcon/> Mentions J'aime </Link>
                    </li>
                </ul>

            </nav>
            <Outlet/>
        </aside>
    );
}

export default SidebarDashBord;
