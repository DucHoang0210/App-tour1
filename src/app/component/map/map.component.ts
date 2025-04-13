import { Component, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  @Input() lat: number = 10.7769; // Mặc định TP.HCM
  @Input() lng: number = 106.7009;
  @Input() zoom: number = 14;

  // chạy lên web sẽ bị lỗi "BillingNotEnabledMapError" vì phải thanh toán 300$ 1 tháng

  ngAfterViewInit() {
    if (!this.mapContainer) {
      console.error('Không tìm thấy thẻ chứa bản đồ!');
      return;
    }

    if ((window as any).google) {
      new (window as any).google.maps.Map(this.mapContainer.nativeElement, {
        center: { lat: this.lat, lng: this.lng },
        zoom: this.zoom,
      });
    } else {
      console.error('Google Maps API chưa được tải.');
    }
  }
}
