import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    { path: '', redirectTo: '/user/login', pathMatch: 'full' },
    {
        path: 'user',
        component: UserComponent,
        children: [
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'forbidden',
        component: ForbiddenComponent
    },
    {
        path: 'adminpanel',
        component: AdminPanelComponent,
        canActivate: [AuthGuard],
        data: { permittedRoles: ['Administrator'] }
    }
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],

})

export class AppRoutingModule { }

