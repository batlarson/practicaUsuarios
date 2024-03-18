import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { BotonesUserComponent } from '../../components/botones-user/botones-user.component';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [RouterLink, BotonesUserComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css',
})
export class UserViewComponent {
  activatedRoute = inject(ActivatedRoute);
  usuariosService = inject(UsuariosService);
  miUser!: IUsuario;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      const id = params.id;
      try {
        let response = await this.usuariosService.getById(id);
        this.miUser = response;
      } catch (error) {}
    });
  }
}
