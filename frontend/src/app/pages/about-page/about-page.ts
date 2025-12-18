import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-page.html',
  styleUrl: './about-page.scss'
})
export class AboutPage implements OnInit {
  ovenTemperature = 0;
  private interval: any;

  ngOnInit(): void {
    this.animateOvenTemperature();
  }

  private animateOvenTemperature(): void {
    let temp = 0;
    this.interval = setInterval(() => {
      if (temp < 200) {
        temp += Math.random() * 12;
        this.ovenTemperature = Math.min(temp, 200);
      }
    }, 400);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

