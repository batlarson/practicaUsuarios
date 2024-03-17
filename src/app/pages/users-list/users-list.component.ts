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
  objetoRespuesta: any = [];
  arrUsuarios: IUsuario[] = [this.objetoRespuesta];

  async ngOnInit(): Promise<any> {
    try {
      this.objetoRespuesta = await this.usuariosService.getAll();
    } catch (err) {}
  }
}
