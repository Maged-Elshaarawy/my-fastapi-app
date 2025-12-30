terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-west-2" # عدّل حسب منطقتك
}

# أحدث Ubuntu 22.04
data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

resource "aws_security_group" "allow_http_ssh" {
  name        = "allow-http-ssh"
  description = "Allow SSH and HTTP"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # أو IP بتاعك/32
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "ubuntu" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.medium" # مناسب للتجارب المجانية
  key_name      = "lab.pem" # لازم تكون موجودة في AWS
  vpc_security_group_ids = [aws_security_group.allow_http_ssh.id]

  tags = {
    Name = "ubuntu-terraform"
  }
}

output "public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.ubuntu.public_ip
}
