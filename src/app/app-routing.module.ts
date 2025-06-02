import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'criar-conta',
    loadChildren: () => import('./criar-conta/criar-conta.module').then( m => m.CriarContaPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'top-vendas',
    loadChildren: () => import('./top-vendas/top-vendas.module').then( m => m.TopVendasPageModule)
  },
  {
    path: 'personalizar-ramo',
    loadChildren: () => import('./personalizar-ramo/personalizar-ramo.module').then( m => m.PersonalizarRamoPageModule)
  },
  {
    path: 'nova-encomenda',
    loadChildren: () => import('./nova-encomenda/nova-encomenda.module').then( m => m.NovaEncomendaPageModule)
  },
  {
    path: 'finalizar-um',
    loadChildren: () => import('./finalizar-um/finalizar-um.module').then( m => m.FinalizarUmPageModule)
  },
  {
    path: 'personalizar-um',
    loadChildren: () => import('./personalizar-um/personalizar-um.module').then( m => m.PersonalizarUmPageModule)
  },
  {
    path: 'personalizar-dois',
    loadChildren: () => import('./personalizar-dois/personalizar-dois.module').then( m => m.PersonalizarDoisPageModule)
  },
  {
    path: 'personalizar-tres',
    loadChildren: () => import('./personalizar-tres/personalizar-tres.module').then( m => m.PersonalizarTresPageModule)
  },
  {
    path: 'obrigado',
    loadChildren: () => import('./obrigado/obrigado.module').then( m => m.ObrigadoPageModule)
  },
  {
    path: 'cancelar',
    loadChildren: () => import('./cancelar/cancelar.module').then( m => m.CancelarPageModule)
  },
  {
    path: 'top-vendas-um',
    loadChildren: () => import('./top-vendas-um/top-vendas-um.module').then( m => m.TopVendasUmPageModule)
  },
  {
    path: 'top-vendas-dois',
    loadChildren: () => import('./top-vendas-dois/top-vendas-dois.module').then( m => m.TopVendasDoisPageModule)
  },
  {
    path: 'top-vendas-tres',
    loadChildren: () => import('./top-vendas-tres/top-vendas-tres.module').then( m => m.TopVendasTresPageModule)
  },
  {
    path: 'nova-encomenda-um',
    loadChildren: () => import('./nova-encomenda-um/nova-encomenda-um.module').then( m => m.NovaEncomendaUmPageModule)
  },
  {
    path: 'nova-encomenda-dois',
    loadChildren: () => import('./nova-encomenda-dois/nova-encomenda-dois.module').then( m => m.NovaEncomendaDoisPageModule)
  },
  {
    path: 'nova-encomenda-tres',
    loadChildren: () => import('./nova-encomenda-tres/nova-encomenda-tres.module').then( m => m.NovaEncomendaTresPageModule)
  },  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
