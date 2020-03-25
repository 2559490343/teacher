import XLSX from "xlsx";

class Fn {
    // 格式化时间
    formatDateTime(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        var second = date.getSeconds();
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    }

    /*
        将json数组转成xlsx文件导出
        json格式：
        let json = [
        {
          studentName: "张三",
          studentNum: "3116004001"
        },
        {
          studentName: "李四",
          studentNum: "3116004005"
        },
        {
          studentName: "王五",
          studentNum: "3116004002"
        }
      ];
    */
   jsonToXlsx(json, tableName) {
        var sheet = XLSX.utils.json_to_sheet(json)
        this.sheet2blob(sheet, 'sheet1', tableName)
    }
    /*
    将二维数组转成xlsx文件导出
    数组格式：
    var aoa = [
        ["姓名", "学号"],
        ["张三", "3116004001"],
        ["李四", "3116004002"]
      ]; 
      */
    aoaToXlsx(json, tableName) {
        var sheet = XLSX.utils.json_to_sheet(json)
        this.sheet2blob(sheet, 'sheet1', tableName)
    }
    sheet2blob(sheet, sheetName, tableName) {
        sheetName = sheetName || "sheet1";
        var workbook = { SheetNames: [sheetName], Sheets: {} };
        workbook.Sheets[sheetName] = sheet;
        // 生成excel的配置项
        var wopts = {
            bookType: "xlsx",
            // 要生成的文件类型
            bookSST: false,
            // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
            type: "binary"
        };
        var wbout = XLSX.write(workbook, wopts);
        var blob = new Blob([s2ab(wbout)], {
            type: "application/octet-stream"
        });
        // 字符串转ArrayBuffer
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
            return buf;
        }
        // return blob;
        this.openDownloadDialog(blob, tableName)
    }
    openDownloadDialog(url, saveName) {
        if (typeof url == "object" && url instanceof Blob) {
            url = URL.createObjectURL(url);
            // 创建blob地址
        }
        var aLink = document.createElement("a");
        aLink.href = url;
        aLink.download = saveName || "";
        // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
        var event;
        if (window.MouseEvent) event = new MouseEvent("click");
        else {
            event = document.createEvent("MouseEvents");
            event.initMouseEvent(
                "click",
                true,
                false,
                window,
                0,
                0,
                0,
                0,
                0,
                false,
                false,
                false,
                false,
                0,
                null
            );
        }
        aLink.dispatchEvent(event);
    }

}

export default new Fn();