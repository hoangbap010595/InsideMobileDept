use master
go
if exists (select name from sys.databases where name = 'MobileStore')
	 drop database [MobileStore]
go
create database [MobileStore]
go
use [MobileStore]
go
/****** Object:  Table [dbo].[HistoryPayment]    Script Date: 9/20/2017 11:47:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistoryPayment](
	[Id] [int] IDENTITY(3,3) NOT NULL,
	[DeptId] [int] NULL,
	[DatePayment] [datetime] NULL,
	[PricePayment] [decimal](18, 0) NULL,
	[Description] [nvarchar](max) NULL,
	[Note] [nvarchar](max) NULL,
 CONSTRAINT [PK_dbo.HistoryPayment] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Log]    Script Date: 9/20/2017 11:47:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Action] [nvarchar](256) NULL,
	[Description] [nvarchar](max) NULL,
	[Date] [datetime] NULL,
 CONSTRAINT [PK_dbo.Log] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Menu]    Script Date: 9/20/2017 11:47:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Menu](
	[Id] [int] IDENTITY(1,10) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[Description] [nvarchar](256) NULL,
	[Path] [nvarchar](256) NULL,
 CONSTRAINT [PK_dbo.Menu] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Object]    Script Date: 9/20/2017 11:47:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Object](
	[ObjectId] [int] IDENTITY(1,2) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[FullName] [nvarchar](256) NULL,
	[Address] [nvarchar](256) NULL,
	[Passport] [nvarchar](256) NULL,
	[DateOfBirth] [datetime] NULL,
	[Job] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[PhoneNumber] [nvarchar](256) NULL,
	[Gender] [bit] NULL,
	[Note] [nvarchar](max) NULL,
	[ICPerMonth] [decimal](18, 0) NULL,
 CONSTRAINT [PK_dbo.Object] PRIMARY KEY CLUSTERED 
(
	[ObjectId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ObjectRef]    Script Date: 9/20/2017 11:47:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ObjectRef](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ObjectId] [int] NOT NULL,
	[FullName] [nvarchar](256) NULL,
	[PhoneNumber] [nvarchar](256) NULL,
 CONSTRAINT [PK_dbo.ObjectRef] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[PaymentStatus]    Script Date: 9/20/2017 11:47:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PaymentStatus](
	[Id] [int] IDENTITY(2,2) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[Description] [nvarchar](256) NULL,
	[Type] [int] NULL,
	[Enable] [bit] NULL,
 CONSTRAINT [PK_dbo.PaymentStatus] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[PaymentType]    Script Date: 9/20/2017 11:47:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PaymentType](
	[Id] [int] IDENTITY(5,10) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[Description] [nvarchar](256) NULL,
	[Type] [int] NULL,
	[Enable] [bit] NULL,
 CONSTRAINT [PK_dbo.PaymentType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Product]    Script Date: 9/20/2017 11:47:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[Model] [nvarchar](128) NOT NULL,
	[Description] [nvarchar](256) NULL,
	[Price] [decimal](18, 0) NULL,
 CONSTRAINT [PK_dbo.Product] PRIMARY KEY CLUSTERED 
(
	[Model] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ProductDept]    Script Date: 9/20/2017 11:47:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductDept](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DeptId] [int] NOT NULL,
	[Model] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK_dbo.ProductDept] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Roles]    Script Date: 9/20/2017 11:47:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[Id] [nvarchar](128) NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SubDept]    Script Date: 9/20/2017 11:47:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubDept](
	[DeptId] [int] IDENTITY(1,1) NOT NULL,
	[DatePayment] [datetime] NULL,
	[TotalPayment] [decimal](18, 0) NULL,
	[Paid] [decimal](18, 0) NULL,
	[NotPaid] [decimal](18, 0) NULL,
	[PricePayMonth] [decimal](18, 0) NULL,
	[MonthNeedPayment] [int] NULL,
	[Description] [nvarchar](256) NULL,
	[SaleID] [nvarchar](256) NULL,
	[TypeId] [int] NULL,
	[StatusId] [int] NULL,
	[ObjectId] [int] NULL,
 CONSTRAINT [PK_dbo.SubDept] PRIMARY KEY CLUSTERED 
(
	[DeptId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SubMenu]    Script Date: 9/20/2017 11:47:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubMenu](
	[Id] [int] IDENTITY(1,10) NOT NULL,
	[MenuLevel] [int] NULL,
	[Name] [nvarchar](256) NULL,
	[Description] [nvarchar](256) NULL,
	[Path] [nvarchar](256) NULL,
 CONSTRAINT [PK_dbo.SubMenu] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UserClaims]    Script Date: 9/20/2017 11:47:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_dbo.UserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UserLogins]    Script Date: 9/20/2017 11:47:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserLogins](
	[LoginProvider] [nvarchar](128) NOT NULL,
	[ProviderKey] [nvarchar](128) NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_dbo.UserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC,
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UserRoles]    Script Date: 9/20/2017 11:47:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRoles](
	[UserId] [int] NOT NULL,
	[RoleId] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK_dbo.UserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Users]    Script Date: 9/20/2017 11:47:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](256) NOT NULL,
	[FullName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NULL DEFAULT ((0)),
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[Enabled] [bit] NULL DEFAULT ((1)),
	[DateCreate] [datetime] NULL,
	[Status] [bit] NULL DEFAULT ((1)),
	[AccessFailedCount] [int] NULL,
 CONSTRAINT [PK_dbo.Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Menu] ON 

INSERT [dbo].[Menu] ([Id], [Name], [Description], [Path]) VALUES (1, N'Menu Product', N'Quản trị sản phẩm', N'')
INSERT [dbo].[Menu] ([Id], [Name], [Description], [Path]) VALUES (11, N'Menu Dept', N'Quản trị công nợ', N'')
INSERT [dbo].[Menu] ([Id], [Name], [Description], [Path]) VALUES (21, N'Menu Report', N'Báo cáo', N'')
INSERT [dbo].[Menu] ([Id], [Name], [Description], [Path]) VALUES (31, N'Menu System', N'Hệ thống', N'')
INSERT [dbo].[Menu] ([Id], [Name], [Description], [Path]) VALUES (41, N'Menu History', N'Lịch sử giao dịch', N'')
INSERT [dbo].[Menu] ([Id], [Name], [Description], [Path]) VALUES (51, N'Menu Setting', N'Cài đặt', N'')
SET IDENTITY_INSERT [dbo].[Menu] OFF
SET IDENTITY_INSERT [dbo].[PaymentStatus] ON 

INSERT [dbo].[PaymentStatus] ([Id], [Name], [Description], [Type], [Enable]) VALUES (2, N'NOT Payment', N'Chưa thanh toán', 1, 1)
INSERT [dbo].[PaymentStatus] ([Id], [Name], [Description], [Type], [Enable]) VALUES (4, N'Keep Payment', N'Đang thanh toán', 1, 1)
INSERT [dbo].[PaymentStatus] ([Id], [Name], [Description], [Type], [Enable]) VALUES (6, N'OK Payment', N'Đã thanh toán', 1, 1)
INSERT [dbo].[PaymentStatus] ([Id], [Name], [Description], [Type], [Enable]) VALUES (8, N'STOP Payment', N'Hủy thanh toán', 1, 1)
SET IDENTITY_INSERT [dbo].[PaymentStatus] OFF
SET IDENTITY_INSERT [dbo].[PaymentType] ON 

INSERT [dbo].[PaymentType] ([Id], [Name], [Description], [Type], [Enable]) VALUES (5, N'TG', N'Trả góp', 1, 1)
INSERT [dbo].[PaymentType] ([Id], [Name], [Description], [Type], [Enable]) VALUES (15, N'TO', N'Trả 1 lần', 1, 1)
INSERT [dbo].[PaymentType] ([Id], [Name], [Description], [Type], [Enable]) VALUES (25, N'TS', N'Trả sau', 1, 1)
INSERT [dbo].[PaymentType] ([Id], [Name], [Description], [Type], [Enable]) VALUES (35, N'TT', N'Trả trước', 1, 1)
SET IDENTITY_INSERT [dbo].[PaymentType] OFF
INSERT [dbo].[Roles] ([Id], [Name]) VALUES (N'111', N'Administrators')
INSERT [dbo].[Roles] ([Id], [Name]) VALUES (N'333', N'Guests')
INSERT [dbo].[Roles] ([Id], [Name]) VALUES (N'222', N'Users')
SET IDENTITY_INSERT [dbo].[SubMenu] ON 

INSERT [dbo].[SubMenu] ([Id], [MenuLevel], [Name], [Description], [Path]) VALUES (1, 1, N'Menu Product', N'Thêm mới', N'')
INSERT [dbo].[SubMenu] ([Id], [MenuLevel], [Name], [Description], [Path]) VALUES (11, 1, N'Menu Product', N'Cập nhật', N'')
INSERT [dbo].[SubMenu] ([Id], [MenuLevel], [Name], [Description], [Path]) VALUES (21, 1, N'Menu Product', N'Danh sách', N'')
INSERT [dbo].[SubMenu] ([Id], [MenuLevel], [Name], [Description], [Path]) VALUES (31, 11, N'Menu Dept', N'Tạo phiếu', N'')
INSERT [dbo].[SubMenu] ([Id], [MenuLevel], [Name], [Description], [Path]) VALUES (41, 11, N'Menu Dept', N'Cập nhật phiếu', N'')
INSERT [dbo].[SubMenu] ([Id], [MenuLevel], [Name], [Description], [Path]) VALUES (51, 11, N'Menu Dept', N'Thanh toán', N'')
INSERT [dbo].[SubMenu] ([Id], [MenuLevel], [Name], [Description], [Path]) VALUES (61, 21, N'Menu Report', N'Báo cáo công nợ', N'')
INSERT [dbo].[SubMenu] ([Id], [MenuLevel], [Name], [Description], [Path]) VALUES (71, 21, N'Menu Report', N'Báo cáo doanh thu', N'')
INSERT [dbo].[SubMenu] ([Id], [MenuLevel], [Name], [Description], [Path]) VALUES (81, 21, N'Menu Report', N'Báo cáo tổng tiền cần thu', N'')
INSERT [dbo].[SubMenu] ([Id], [MenuLevel], [Name], [Description], [Path]) VALUES (91, 21, N'Menu Report', N'Báo cáo tổng tiền trễ hẹn ', N'')
SET IDENTITY_INSERT [dbo].[SubMenu] OFF
INSERT [dbo].[UserRoles] ([UserId], [RoleId]) VALUES (2, N'111')
INSERT [dbo].[UserRoles] ([UserId], [RoleId]) VALUES (6, N'222')
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [UserName], [FullName], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [Enabled], [DateCreate], [Status], [AccessFailedCount]) VALUES (2, N'HoangLC3', N'Le Cong Hoang', N'lchoang1995@gmail.com', 0, N'123456', NULL, NULL, 1, NULL, 1, NULL)
INSERT [dbo].[Users] ([Id], [UserName], [FullName], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [Enabled], [DateCreate], [Status], [AccessFailedCount]) VALUES (6, N'admin', N'Le Hoang', N'a@gmail.com', 0, N'123456', NULL, NULL, 1, NULL, 1, NULL)
SET IDENTITY_INSERT [dbo].[Users] OFF
ALTER TABLE [dbo].[HistoryPayment] ADD  DEFAULT ((0)) FOR [PricePayment]
GO
ALTER TABLE [dbo].[Object] ADD  DEFAULT ((0)) FOR [ICPerMonth]
GO
ALTER TABLE [dbo].[Product] ADD  DEFAULT ((0)) FOR [Price]
GO
ALTER TABLE [dbo].[SubDept] ADD  DEFAULT ((0)) FOR [TotalPayment]
GO
ALTER TABLE [dbo].[SubDept] ADD  DEFAULT ((0)) FOR [Paid]
GO
ALTER TABLE [dbo].[SubDept] ADD  DEFAULT ((0)) FOR [NotPaid]
GO
ALTER TABLE [dbo].[SubDept] ADD  DEFAULT ((0)) FOR [PricePayMonth]
GO
ALTER TABLE [dbo].[ObjectRef]  WITH CHECK ADD  CONSTRAINT [FK_dbo.Object_dbo.ObjectRef_ObjectId] FOREIGN KEY([ObjectId])
REFERENCES [dbo].[Object] ([ObjectId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ObjectRef] CHECK CONSTRAINT [FK_dbo.Object_dbo.ObjectRef_ObjectId]
GO
ALTER TABLE [dbo].[UserClaims]  WITH CHECK ADD  CONSTRAINT [FK_dbo.UserClaims_dbo.Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UserClaims] CHECK CONSTRAINT [FK_dbo.UserClaims_dbo.Users_UserId]
GO
ALTER TABLE [dbo].[UserLogins]  WITH CHECK ADD  CONSTRAINT [FK_dbo.UserLogins_dbo.Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UserLogins] CHECK CONSTRAINT [FK_dbo.UserLogins_dbo.Users_UserId]
GO
ALTER TABLE [dbo].[UserRoles]  WITH CHECK ADD  CONSTRAINT [FK_dbo.UserRoles_dbo.Roles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Roles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UserRoles] CHECK CONSTRAINT [FK_dbo.UserRoles_dbo.Roles_RoleId]
GO
ALTER TABLE [dbo].[UserRoles]  WITH CHECK ADD  CONSTRAINT [FK_dbo.UserRoles_dbo.Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UserRoles] CHECK CONSTRAINT [FK_dbo.UserRoles_dbo.Users_UserId]
GO
/****** Object:  StoredProcedure [dbo].[checkLoginUser]    Script Date: 9/20/2017 11:47:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Hoang
-- Create date: 2017.09.20
-- Description:	Kiểm tra đăng nhập
-- =============================================
--checkLoginUser @Username = 'admin',@Password='123456', @Type=2
ALTER PROCEDURE [dbo].[checkLoginUser] 
	-- Add the parameters for the stored procedure here
	@Username NVARCHAR (256) = ''
	,@Password NVARCHAR (256) = ''
	,@Type INT = 1
AS
BEGIN
	
    -- Insert statements for procedure here
	IF @Type = 1
	BEGIN
		SELECT [Id],[UserName],[FullName],[Email],[Status],R.Name[Role]
		from [dbo].[Users] U (nolock)
		inner join (Select UR.[UserId],R.[Name] from [dbo].[UserRoles] UR (nolock)
					inner join [dbo].[Roles] R (nolock) on UR.RoleId = R.Id) R on U.Id = R.UserId 
					and U.UserName = @Username and U.PasswordHash = @Password
	END
	ELSE IF @Type = 2
		BEGIN
			SELECT [Id],[UserName],[FullName],[Email],[Status],R.Name[Role]
			from [dbo].[Users] U (nolock)
			inner join (Select UR.[UserId],R.[Name] from [dbo].[UserRoles] UR (nolock)
					inner join [dbo].[Roles] R (nolock) on UR.RoleId = R.Id) R on U.Id = R.UserId 
		END
END