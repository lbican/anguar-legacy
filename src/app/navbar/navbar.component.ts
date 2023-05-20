import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { LoginService } from '../login/login.service';
import { User } from '../user/user.model';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LanguageEnum} from '../constants/language.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed: boolean;
  currentLanguage: string;

  constructor(
    private loginService: LoginService,
    public userService: UserService,
    private router: Router,
    private translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((currentUser: User) => {
      this.userService.currentUser = currentUser;
    });
  }


  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  logout() {
    this.loginService.logout();
    this.userService.currentUser = null;
    this.router.navigate(['/login']);
  }

  isUserLoggedIn(): boolean {
    return !!this.userService.currentUser;
  }

  setCurrentLanguageDropdownValue() {
    if (this.translateService.currentLang === LanguageEnum.HR) {
      this.translateService.get('language.croatian').subscribe(language => this.currentLanguage = language);
    } else if (this.translateService.currentLang === LanguageEnum.EN) {
      this.translateService.get('language.english').subscribe(language => this.currentLanguage = language);
    } else {
      throw Error('Unknown current language!');
    }
  }

  onLanguageChange(newLanguage: string) {
    this.translateService.use(newLanguage).subscribe(
      languageSwitched => this.setCurrentLanguageDropdownValue()
    );
  }
}
