import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    { path: '', redirectTo: '/user/register', pathMatch: 'full' },
    {
        path: 'user',
        component: UserComponent,
        children: [
            {
                path: 'register',
                component: RegisterComponent
            }
        ]
    }
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],

})

export class AppRoutingModule { }

