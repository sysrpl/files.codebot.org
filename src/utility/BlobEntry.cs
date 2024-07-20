using Newtonsoft.Json;

namespace Files;

public class BlobEntry
{
	private byte[] buffer;

	public BlobEntry()
	{
		buffer = null;
		Offset = 0;
		Modified = Tools.UnixTime(DateTime.Now);
		Access = 0;
	}

	[JsonProperty("key")]
	public string Key { get; set; }
	[JsonProperty("name")]
	public string Name { get; set; }
	[JsonProperty("size")]
	public long Size { get; set; }
	[JsonProperty("type")]
	public string Type => Tools.MapContentType(Name);
	[JsonIgnore]
	public string TempName { get => $".tmp-{Key}-{Name}"; }
	[JsonIgnore]
	public long Offset { get; set; }
	[JsonProperty("modified")]
	public long Modified { get; set; }
	[JsonProperty("access")]
	public int Access { get; set; }

	public long CopyTo(Stream input, Stream output)
	{
		long written = 0;
		buffer ??= new byte[16384];
		int bytes;
		while ((bytes = input.Read(buffer, 0, buffer.Length)) > 0)
		{
			output.Write(buffer, 0, bytes);
			written += bytes;
		}
		Offset += written;
		return written;
	}
}
