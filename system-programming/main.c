
#include <fcntl.h>
#include <unistd.h>

int main()
{

	int fd;
	fd = open("foo.txt", O_WRONLY | O_CREAT, 0644);
	write(fd, "hello world", 11);
	close(fd);
}
