import { Component, inject } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { IResponse } from '../../interfaces/iresponse.interface';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsersCardComponent } from '../../components/users-card/users-card.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UsersCardComponent, NgxPaginationModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  usuariosService = inject(UsuariosService);
  data: any = [];
  arrUsuarios: IUsuario[] = [];
  page: number = 1;
  pageSize: number = 8;

  async ngOnInit(): Promise<any> {
    try {
      this.data = await this.usuariosService.getAll();
      this.arrUsuarios = this.data.results;
      console.log(this.data.results);
    } catch (err) {}
  }

  handlePageChange(event: any) {
    this.page = event;
  }
}
