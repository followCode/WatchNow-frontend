import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadVideoResponse } from './upload-video/UploadVideoResponse';
import { VideoDto } from "./video-dto";


@Injectable({
  providedIn: 'root'
})

export class VideoService {
 
  constructor(private httpClient: HttpClient) {}
  
  uploadVideo(fileEntry: File): Observable<UploadVideoResponse> {
	  
	const formData = new FormData();
    formData.append('file', fileEntry, fileEntry.name);
    
    return this.httpClient.post<UploadVideoResponse>("http://localhost:8092/api/video", formData);
  }
  
  getVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient.get<VideoDto>("http://localhost:8092/api/video/" + videoId);
  }
  
  saveVideo(videoMetaData: VideoDto): Observable<VideoDto> {
    return this.httpClient.put<VideoDto>("http://localhost:8092/api/video", videoMetaData);
  }
  
  uploadThumbnail(fileEntry: File, videoId: string): Observable<string> {
    const formData = new FormData()
    formData.append('file', fileEntry, fileEntry.name);
    formData.append('videoId', videoId);

    return this.httpClient.post("http://localhost:8092/api/video/thumbnail", formData, {
      responseType: 'text'
    });
  }
  
  getAllVideos(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("http://localhost:8092/api/video");
  }

  likeVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>("http://localhost:8092/api/video/" + videoId + "/like", null);
  }

  disLikeVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>("http://localhost:8092/api/video/" + videoId + "/disLike", null);
  }
}
