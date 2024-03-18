import { Component, Input } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { IconosUsersComponent } from '../iconos-users/iconos-users.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-card',
  standalone: true,
  imports: [IconosUsersComponent, RouterLink],
  templateUrl: './users-card.component.html',
  styleUrl: './users-card.component.css',
})
export class UsersCardComponent {
  @Input() miUser!: IUsuario;
}
