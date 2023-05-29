import { Component } from '@angular/core';
import { VideoDto } from '../video-dto';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  featuredVideos: Array<VideoDto> = [];
  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
	this.videoService.getAllVideos().subscribe(response => {
    	this.featuredVideos = response;
    });
  }
}
