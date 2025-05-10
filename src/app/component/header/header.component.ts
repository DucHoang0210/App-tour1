import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isDropdownVisible = false;

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  isMenuVisible = false;

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown && !dropdown.contains(event.target as Node)) {
      this.isDropdownVisible = false;
      // this.isMenuVisible = false;
    }
  }


  constructor(private router: Router) {}

  onHome() {
    this.router.navigate(['']); // thay bằng route bạn muốn
  }

  onContact() {
    this.router.navigate(['/contact']);
  }

  onIntro() {
    this.router.navigate(['/introduction']);
  }

  onTravelTips() {
    this.router.navigate(['/travel-tips']);
  }

  showInput = false;
  searchText = '';
  originalItems: string[] = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango'];
  filteredItems: string[] = [];

  onSearch() {
    this.showInput = true;
  }

  toggleSearch() {
    this.showInput = !this.showInput;
    if (!this.showInput) {
      this.searchText = '';
      this.filteredItems = [];
    }
  }

  filterData() {
    const keyword = this.searchText.toLowerCase().trim();
    if (keyword.length > 0) {
      this.filteredItems = this.originalItems.filter(item =>
        item.toLowerCase().includes(keyword)
      );
    } else {
      this.filteredItems = []; // Nếu không có keyword, clear danh sách
    }
  }

}
