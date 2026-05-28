import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  scrolled = signal(false);
  menuOpen = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 40);
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  navLinks = [
    { path: '/supervivencia', label: 'Supervivencia' },
    { path: '/campismo', label: 'Campismo' },
    { path: '/navegacion', label: 'Navegación' },
    { path: '/nudos', label: 'Nudos' },
    { path: '/primeros-auxilios', label: 'Primeros Auxilios' },
    { path: '/cocina', label: 'Cocina y Fogón' },
  ];
}
