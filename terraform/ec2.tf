resource "aws_instance" "ubuntu" {
  count         = var.instance_count
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.medium"
  key_name      = aws_key_pair.ec2.key_name
  vpc_security_group_ids = [aws_security_group.allow_http_ssh.id]

  tags = {
    Name = "my-fastapi-app-${count.index + 1}"
  }
}
