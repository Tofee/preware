// formats a timestamp to a readable date
formatDate = function(date)
{
	var dateObj = new Date(date * 1000);
	var toReturn = '';
	var pm = false;
	
	toReturn += (dateObj.getMonth() + 1) + '/' + dateObj.getDate() + '/' + String(dateObj.getFullYear()).substring(2) + ' ';
	
	if (dateObj.getHours() > 12) pm = true;
	
	if (!pm)
	{
		if (dateObj.getHours() < 1) toReturn += '12';
		if (dateObj.getHours() > 0) toReturn += dateObj.getHours();
		toReturn += ':';
		if (dateObj.getMinutes() < 10) toReturn += '0'
		toReturn += dateObj.getMinutes() + ' AM';
	}
	else
	{
		toReturn += (dateObj.getHours() - 12) + ':';
		if (dateObj.getMinutes() < 10) toReturn += '0'
		toReturn += dateObj.getMinutes() + ' PM';
	}
	
	return toReturn;
}

// condences bytes to a better rate
formatSize = function(size)
{
	var toReturn = size + ' B';
	var formatSize = size;
	
	if (formatSize > 1024)
	{
		formatSize = (Math.round((formatSize / 1024) * 100) / 100);
		toReturn = formatSize + ' KB';
	}
	if (formatSize > 1024)
	{
		formatSize = (Math.round((formatSize / 1024) * 100) / 100);
		toReturn = formatSize + ' MB';
	}
	// I don't think we need to worry about GB here...
	
	// return formatted size
	return toReturn;
}

// formats a url to something that can be a link
function getDomain (url)
{
	var r = new RegExp("(http|ftp|https)://(.*?)/.*$");
	var matched = url.match(r);
	var stripped = matched[2].replace(/www./, '');
	return stripped;
}