import { Component, OnInit } from '@angular/core';
import { ImageapiService } from '../../services/imageapi.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  gettyImageUri: string;
  gettyResult: any;
  giphyResult: any;
  giphyImageUri: string;

  constructor(private imageApi: ImageapiService) { }

  ngOnInit() {
    const randomIndex = Math.floor((Math.random() * 30));
    this.imageApi.getGettyImages().subscribe(
      data => {this.gettyResult = data;
        this.gettyImageUri = this.gettyResult.images[randomIndex].display_sizes[0].uri;
      }
    );

    this.imageApi.getGiphyImage().subscribe(
      data => {
        this.giphyResult = data;
        this.giphyImageUri = this.giphyResult.data.images.downsized.url;
        console.log(this.gettyImageUri);
      }
    );
  }

}

interface GiphyResult {
  data: GiphyData;
}

interface GiphyData {
  embedUrl: string;
}

interface GettyResult {
  return_count: number;
  images: Image[];
}

interface Image {
  id: string;
  display_size: DisplaySize[];
}

interface DisplaySize {
  uri: string;
}
