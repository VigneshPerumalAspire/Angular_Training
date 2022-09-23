import { Component, HostBinding, OnInit } from '@angular/core';
import { DynamicService, DynamicItem } from './dynamic.service';
import { OverlayContainer } from '@angular/cdk/overlay';

const THEME_DARKNESS_SUFFIX = `-dark`;
declare var $: any;  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-Learning';
  dynamic: DynamicItem[] = [];
  themes: string[] = [
    'deeppurple-amber',
    'indigo-pink',
    'pink-bluegrey',
    'purple-green',
    'teal-green'
  ];


  constructor(private dynamicservice: DynamicService, private overlayContainer: OverlayContainer) {}

  ngOnInit(): void {
    this.setTheme('indigo-pink', false); // Default Theme
    this.SetStyleSheet();
  }

  @HostBinding('class') activeThemeCssClass!: string;
  isThemeDark = false;
  activeTheme!: string;

  setTheme(theme: string, darkness: boolean | any = null) {
    if (darkness === null) {
      darkness = this.isThemeDark;
    } else if (this.isThemeDark === darkness) {
      if (this.activeTheme === theme) {
        return theme;
      }
    } else {
      this.isThemeDark = darkness;
    }
     this.activeTheme = theme;

    const cssClass = darkness === true ? theme + THEME_DARKNESS_SUFFIX : theme;

    const classList = this.overlayContainer.getContainerElement().classList;
    if (classList.contains(this.activeThemeCssClass))
      classList.replace(this.activeThemeCssClass, cssClass);
    else classList.add(cssClass);

    return this.activeThemeCssClass = cssClass;
  }

  toggleDarkness() {
    this.setTheme(this.activeTheme, !this.isThemeDark);
  }  

  SetStyleSheet() {
    // const link = document.createElement('link');
    // // link.type = 'text/css';
    // link.href = 'custom.scss';
    // link.rel = 'stylesheet';
    // document.getElementsByTagName('HEAD')[0].appendChild(link);

    // if (document.getElementById('CsutomLink')) {
    // const test: any = document.getElementById('CsutomLink');
    // test.href = 'custom.scss';
    // test.setAttribute('rel', 'stylesheet');
    // test.type = 'text/css'
    // }
    $(document).ready(() => {
      $("#CsutomLink").attr("href", "custom.css");
    })
  }
}
