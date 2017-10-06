import { Injectable } from '@angular/core';
import 'jquery';
declare var $: any;

@Injectable()
export class TableHelperService {

  constructor() { }

  checkContainerHeight(previousHeight) {
    const contianer = $('.multi-series-container');
    const heightDiff = (previousHeight !== contianer.height());
    previousHeight = contianer.height();
    return heightDiff;
  }

  checkTableWidth(tableWidths) {
    const tables = $('.table');
    const widths = tableWidths;
    if (tables) {
      tables.each(function (index) {
        const widthDiff = (tableWidths[index] !== tables[index].scrollWidth);
        if (widthDiff) {
          tables[index].scrollLeft = tables[index].scrollWidth;
        }
        widths[index] = tables[index].scrollWidth;
      });
    }
  }

  tableScroll(tableEl): void {
    try {
      tableEl._results.forEach((el) => {
        el.nativeElement.scrollLeft = el.nativeElement.scrollWidth;
      });
    } catch (err) {
      console.log(err);
    }
  }

  showPopover(seriesInfo, subcatIndex?) {
    $('[data-toggle="tooltip"]').tooltip('hide');
    const popoverId = subcatIndex ? '#' + subcatIndex + seriesInfo.id : '#' + seriesInfo.id;
    const popover = $(popoverId).popover({
      trigger: 'manual',
      placement: function (popoverEl, el) {
        // popoverEl = popover DOM element
        // el = DOM element that triggers popover
        let position = 'top';
        const elOffset = $(el).offset().top;
        if (elOffset <= 150) {
          position = 'bottom';
        }
        return position;
      },
      html: true,
      title: function () {
        let title = seriesInfo.title;
        title += seriesInfo.unitsLabel ? ' (' + seriesInfo.unitsLabel + ')' : ' (' + seriesInfo.unitsLabelShort + ')';
        return title;
      },
      content: function () {
        let info = '';
        if (seriesInfo.seasonalAdjustment === 'seasonally_adjusted') {
          info += 'Seasonally Adjusted<br>';
        }
        if (seriesInfo.sourceDescription) {
          info += 'Source: ' + seriesInfo.sourceDescription + '<br>';
        }
        if (seriesInfo.sourceLink) {
          info += '<a target="_blank" href="' + seriesInfo.sourceLink + '">' + seriesInfo.sourceLink + '</a><br>';
        }
        if (seriesInfo.sourceDetails) {
          info += seriesInfo.sourceDetails;
        }
        return info;
      }
    }).on('show.bs.popover', function (e) {
      // Display only one popover at a time
      $('.popover').not(e.target).popover('dispose');
      setTimeout(() => {
        // Close popover on next click (source link in popover is still clickable)
        $('body').one('click', function () {
          popover.popover('dispose');
        });
      }, 1);
    });
    popover.popover('toggle');
  }

  hideInfo(seriesId) {
    $('[data-toggle="tooltip"]').tooltip('hide');
    $('.popover').popover('dispose');
  }

}
