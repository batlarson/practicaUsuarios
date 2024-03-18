import { Component, inject } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { IResponse } from '../../interfaces/iresponse.interface';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsersCardComponent } from '../../components/users-card/users-card.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UsersCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  usuariosService = inject(UsuariosService);
  data: any = [];
  arrUsuarios: IUsuario[] = [];

  async ngOnInit(): Promise<any> {
    try {
      this.data = await this.usuariosService.getAll();
      this.arrUsuarios = this.data.results;
      console.log(this.data.results);
    } catch (err) {}
  }
}
