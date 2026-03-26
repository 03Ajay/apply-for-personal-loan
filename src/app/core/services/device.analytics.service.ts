// device.analytics.service.ts
import { Injectable } from '@angular/core';

// Define the DeviceDetails interface
export interface DeviceDetails {
  screen: string;
  browser: string;
  browserVersion: string;
  browserMajorVersion: number;
  mobile: boolean;
  os: string;
  osVersion: string;
  cookies: boolean;
  logTimeStamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  public GetDeviceDetails(): DeviceDetails {
    const unknown = '-';

    // screen
    let screenSize = '';
    if (screen.width) {
      const screenWidth = screen.width ? screen.width : '';
      const screenHeight = screen.height ? screen.height : '';
      screenSize += '' + screenWidth + ' x ' + screenHeight;
    }

    // browser
    const nVer = navigator.appVersion;
    const nAgt = navigator.userAgent;
    let Browsers = navigator.appName;
    let version = '' + parseFloat(navigator.appVersion);
    let majorVersion = parseInt(navigator.appVersion, 10);
    let nameOffset;
    let verOffset;
    let ix;

    // Opera
    if (nAgt.indexOf('Opera') !== -1) {
      Browsers = 'Opera';
      verOffset = nAgt.indexOf('Opera');
      version = nAgt.substring(verOffset + 6);
      if (nAgt.indexOf('Version') !== -1) {
        verOffset = nAgt.indexOf('Version');
        version = nAgt.substring(verOffset + 8);
      }
    }
    // Opera Next
    if (nAgt.indexOf('OPR') !== -1) {
      Browsers = 'Opera';
      verOffset = nAgt.indexOf('OPR');
      version = nAgt.substring(verOffset + 4);
    } else if (nAgt.indexOf('Edge') !== -1) {
      // Edge
      Browsers = 'Microsoft Edge';
      verOffset = nAgt.indexOf('Edge');
      version = nAgt.substring(verOffset + 5);
    } else if (nAgt.indexOf('MSIE') !== -1) {
      // MSIE
      Browsers = 'Microsoft Internet Explorer';
      verOffset = nAgt.indexOf('MSIE');
      version = nAgt.substring(verOffset + 5);
    } else if (nAgt.indexOf('Chrome') !== -1) {
      // Chrome
      Browsers = 'Chrome';
      verOffset = nAgt.indexOf('Chrome');
      version = nAgt.substring(verOffset + 7);
    } else if (nAgt.indexOf('Safari') !== -1) {
      // Safari
      Browsers = 'Safari';
      verOffset = nAgt.indexOf('Safari');
      version = nAgt.substring(verOffset + 7);
      if (nAgt.indexOf('Version') !== -1) {
        verOffset = nAgt.indexOf('Version');
        version = nAgt.substring(verOffset + 8);
      }
    } else if (nAgt.indexOf('Firefox') !== -1) {
      // Firefox
      Browsers = 'Firefox';
      verOffset = nAgt.indexOf('Firefox');
      version = nAgt.substring(verOffset + 8);
    } else if (nAgt.indexOf('Trident/') !== -1) {
      // MSIE 11+
      Browsers = 'Microsoft Internet Explorer';
      const rvIndex = nAgt.indexOf('rv:');
      if (rvIndex !== -1) {
        version = nAgt.substring(rvIndex + 3);
      }
    } else if (nAgt.lastIndexOf(' ') + 1 < nAgt.lastIndexOf('/')) {
      // Other Browsers
      nameOffset = nAgt.lastIndexOf(' ') + 1;
      verOffset = nAgt.lastIndexOf('/');
      Browsers = nAgt.substring(nameOffset, verOffset);
      version = nAgt.substring(verOffset + 1);
      if (Browsers.toLowerCase() === Browsers.toUpperCase()) {
        Browsers = navigator.appName;
      }
    }
    // trim the version string
    if (version.indexOf(';') !== -1) {
      ix = version.indexOf(';');
      version = version.substring(0, ix);
    }
    if (version.indexOf(' ') !== -1) {
      ix = version.indexOf(' ');
      version = version.substring(0, ix);
    }
    if (version.indexOf(')') !== -1) {
      ix = version.indexOf(')');
      version = version.substring(0, ix);
    }

    majorVersion = parseInt('' + version, 10);
    if (isNaN(majorVersion)) {
      version = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }

    // mobile version
    const Mobiles = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

    // cookie
    let cookieEnabled = navigator.cookieEnabled ? true : false;

    if (typeof navigator.cookieEnabled === 'undefined' && !cookieEnabled) {
      document.cookie = 'testcookie';
      cookieEnabled = document.cookie.indexOf('testcookie') !== -1 ? true : false;
    }

    // system
    let Os = unknown;
    const clientStrings = [
      { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
      { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
      { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
      { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
      { s: 'Windows Vista', r: /Windows NT 6.0/ },
      { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
      { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
      { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
      { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
      { s: 'Windows 98', r: /(Windows 98|Win98)/ },
      { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
      { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
      { s: 'Windows CE', r: /Windows CE/ },
      { s: 'Windows 3.11', r: /Win16/ },
      { s: 'Android', r: /Android/ },
      { s: 'Open BSD', r: /OpenBSD/ },
      { s: 'Sun OS', r: /SunOS/ },
      { s: 'Linux', r: /(Linux|X11)/ },
      { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
      { s: 'Mac OS X', r: /Mac OS X/ },
      { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
      { s: 'QNX', r: /QNX/ },
      { s: 'UNIX', r: /UNIX/ },
      { s: 'BeOS', r: /BeOS/ },
      { s: 'OS/2', r: /OS\/2/ },
      {
        s: 'Search Bot',
        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
      },
    ];
    for (const id in clientStrings) {
      if (clientStrings.hasOwnProperty(id) && clientStrings[id]) {
        const cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
          Os = cs.s;
          break;
        }
      }
    }

    let OsVersion: string = '';

    if (/Windows/.test(Os)) {
      const windowsMatch = /Windows (.*)/.exec(Os);
      if (windowsMatch && windowsMatch[1]) {
        OsVersion = windowsMatch[1];
      }
      Os = 'Windows';
    }

    switch (Os) {
      case 'Mac OS X':
        const macMatch = /Mac OS X (10[\.\_\d]+)/.exec(nAgt);
        if (macMatch && macMatch[1]) {
          OsVersion = macMatch[1];
        }
        break;
      case 'Android':
        const androidMatch = /Android ([\.\_\d]+)/.exec(nAgt);
        if (androidMatch && androidMatch[1]) {
          OsVersion = androidMatch[1];
        }
        break;
      case 'iOS':
        const iosMatch = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
        if (iosMatch) {
          const major = iosMatch[1] || '0';
          const minor = iosMatch[2] || '0';
          const patch = iosMatch[3] || '0';
          OsVersion = major + '.' + minor + '.' + patch;
        }
        break;
      default:
        break;
    }

    // flash (you'll need to include swfobject)
    /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
    // let flashVersion = 'no check';
    // if (typeof swfobject != 'undefined') {
    //     let fv = swfobject.getFlashPlayerVersion();
    //     if (fv.major > 0) {
    //         flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
    //     }
    //     else {
    //         flashVersion = unknown;
    //     }
    // }

    return {
      screen: screenSize,
      browser: Browsers,
      browserVersion: version,
      browserMajorVersion: majorVersion,
      mobile: Mobiles,
      os: Os,
      osVersion: OsVersion,
      cookies: cookieEnabled,
      logTimeStamp: new Date().toString(),
    };
  }
}
