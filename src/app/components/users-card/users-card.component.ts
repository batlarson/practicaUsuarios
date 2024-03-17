import { Component, Input } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario.interface';

@Component({
  selector: 'app-users-card',
  standalone: true,
  imports: [],
  templateUrl: './users-card.component.html',
  styleUrl: './users-card.component.css',
})
export class UsersCardComponent {
  @Input() miUser!: IUsuario;
  nombre: string = this.miUser.first_name + this.miUser.last_name;
}
