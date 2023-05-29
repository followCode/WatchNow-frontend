import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-save-video-details',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})

export class UploadVideoComponent {

  public files: NgxFileDropEntry[] = [];
  fileEntry: FileSystemFileEntry | undefined;
  fileUploaded : boolean = false;
  
  constructor(private videoService: VideoService, 
  				private router: Router) {
	  
  }
  

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        this.fileEntry.file((file: File) => {
          console.log(droppedFile.relativePath, file);
          this.fileUploaded = true;

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any){
    console.log(event);
  }

  public fileLeave(event: any){
    console.log(event);
  }
  
  uploadVideo() {
	  if(this.fileEntry != undefined) {
		  
		  this.fileEntry.file(file => {
			  if(file != undefined) {
				   	this.videoService.uploadVideo(file).subscribe(data => {
						this.router.navigateByUrl("/save-video-details/"+ data.videoId); 
			  });
			  }
		  })
		  
	  }
  }
}