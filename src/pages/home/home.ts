import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { EmailComposer } from '@ionic-native/email-composer';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pdfSrc: string = '';
  loginEmail: any;
  fileName: any;
  completePath: any;
  urlname: any;

  constructor(public navCtrl: NavController,
    public transfer: FileTransfer,
    private emailComposer: EmailComposer,
    public file: File, ) {
      
      //this.pdfSrc = "assets/sample.pdf";


  }
 // email pdf to users.
 doMail() {
  //this.download();
  console.log(this.completePath);
  if (this.completePath == null || this.completePath == undefined) {
    console.log("nothing to show....")
  } else {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        //Now we know we can send
      }
    });
    let email = {
      app: 'gmail',
      to: 'mihir.patel@weavolve.com',
      cc: 'mihirp1730@gmail.com',
      bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        // 'file://img/logo.png',
        // 'res://icon.png',
        // 'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        this.completePath
      ],
      subject: 'Testing Mail',
      body: 'How are you? Nice greetings from Mihir Patel, you can find attachment file' + this.fileName,
      isHtml: true
    };
    console.log(email.to);
    console.log(email.cc);
    console.log(email.attachments);

    // Send a text message using default options
    this.emailComposer.open(email);
  }
}


//working code for download PDF to device folder.
download() {
  console.log(this.pdfSrc);
  var url1 = this.pdfSrc;
  var filename = Math.floor(100000 + Math.random() * 999999);
  // var filename = url1.substring(url1.lastIndexOf('/' && '%' && '&') + 1);
  console.log(filename);
  console.log(this.pdfSrc);
  const fileTransfer: FileTransferObject = this.transfer.create();
  var pathFile = this.file.externalDataDirectory + 'Download/';
  const url = this.pdfSrc;

  fileTransfer.download(url, pathFile + filename + '.pdf').then((entry) => {
    console.log(entry);
    this.fileName = entry.name;
    this.completePath = entry.toURL();
    console.log(this.completePath);
    console.log(this.fileName);
    console.log('download complete: ' + entry.toURL());

    if (this.completePath) {
      this.doMail();
    }
  }, (error) => {
    // handle error
  });
}
}
