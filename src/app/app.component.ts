import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('heartAnimation', [
      transition(':enter', [
        animate('0.8s ease-out', keyframes([
          style({ opacity: 0, transform: 'scale(0.5)', offset: 0 }),
          style({ opacity: 1, transform: 'scale(1.5)', offset: 0.5 }),
          style({ opacity: 1, transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'valentines';

  // Roulette love messages (full heartfelt messages)
  loveMessages: string[] = [
    "You are my wabydumby",
    "I love you dumwa",
    "If you ever feel alone, I'll always be there for you",
    "MWAHHHHHHH",
    "I fall in love with you more each day",
    "You make me the happiest :D",
    "Let's fuck",
    "Can we do anal?",
    "Loving you is my favorite adventure",
    "You complete me in every way",
    "I cherish every memory we share",
    "Your love is my greatest treasure",
    "You are the reason I believe in love",
    "Every love song reminds me of you",
    "wawawawa my precious wadumby",
    "You are my forever and always",
    "Your love makes me want to be my best",
    "I am lost in your love every single day",
    "You make my heart sing with happiness",
    "I promise to love you more and more everyday",
    "You are the spark that ignites my soul",
    "In your arms, I have found my home",
    "Loving you is my life's sweetest reward",
    "My love for you knows no boundaries",
    "You are the light that guides me home",
    "Together, our love knows no limits",
    "You make every day feel like a fairytale",
    "Your love is a melody that fills my heart",
    "I treasure every moment we spend together",
    "You are my heart's eternal desire",
    "Every day with you is a new adventure",
    "Your love has transformed my world",
    "I am forever grateful for your love",
    "With you, every day is dumwaby day",
    "You are my heart, my soul, my everything",
    "I love you more than words can express",
    "I see my future wife in you",
    "Your love is my guiding star"
  ];

  currentMessage: string = '';
  machineMessage: string = '';  // For the machine display (number)
  showMessage: boolean = false;
  rotationAngle: number = 0;
  isSpinning: boolean = false;
  private machineInterval: any;

  // New properties for background image control
  showBackground: boolean = false;
  backgroundTransform: string = 'none';

  ngOnInit(): void {
    // Initialization if needed
  }

  spinRoulette() {
    if (this.isSpinning) return;

    // On spin, show the background image if not already visible
    if (!this.showBackground) {
      this.showBackground = true;
    }
    // Randomly decide between a horizontal or vertical flip:
    const flip = Math.random() < 0.5 ? 'scaleX(-1)' : 'scaleY(-1)';
    // Also pick a random rotation angle (e.g., between 0 and 360 degrees)
    const randomRotation = Math.floor(Math.random() * 360);
    // Combine both transformations:
    this.backgroundTransform = `${flip} rotate(${randomRotation}deg)`;

    if (this.showMessage) {
      this.showMessage = false;
    }
    this.isSpinning = true;

    // Update machine display during spin
    this.machineInterval = setInterval(() => {
      const rand = Math.floor(Math.random() * this.loveMessages.length);
      this.machineMessage = "Love Message " + (rand + 1);
    }, 300);

    const segments = this.loveMessages.length;
    const randomIndex = Math.floor(Math.random() * segments);
    const segmentAngle = 360 / segments;
    const winningSegmentCenter = randomIndex * segmentAngle + segmentAngle / 2;
    const offset = 360 - winningSegmentCenter;
    const totalSpins = 5;
    this.rotationAngle += totalSpins * 360 + offset;

    setTimeout(() => {
      clearInterval(this.machineInterval);
      this.machineMessage = "Love Message " + (randomIndex + 1);
      this.currentMessage = this.loveMessages[randomIndex];
      this.showMessage = true;
      this.isSpinning = false;
    }, 3000);
  }
}
